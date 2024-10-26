import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../config/supabase';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { H1 } from '../../components/Typography';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, X } from 'react-feather';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const OrdersContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
  max-width: none !important;
  margin: 0 !important;

  @media (min-width: 1200px) {
    max-width: var(--admin-max-width) !important;
    margin: 0 auto !important;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const FilterButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  cursor: pointer;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  color: ${props => props.$active ? 'var(--color-primary)' : 'var(--color-text)'};
  border-bottom: 2px solid ${props => props.$active ? 'var(--color-primary)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const OrderCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const OrderName = styled.h3`
  font-size: var(--font-size-lg);
  margin: 0;
`;

const OrderDate = styled.span`
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.6);
`;

const OrderDetails = styled.div`
  font-size: var(--font-size-sm);
  
  p {
    margin: 0.5rem 0;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: var(--font-size-xs);
  background: ${props => {
    switch (props.$status) {
      case 'new': return 'rgba(0, 255, 0, 0.2)';
      case 'contacted': return 'rgba(255, 165, 0, 0.2)';
      case 'scheduled': return 'rgba(0, 191, 255, 0.2)';
      case 'completed': return 'rgba(128, 128, 128, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$status) {
      case 'new': return 'rgba(0, 255, 0, 0.3)';
      case 'contacted': return 'rgba(255, 165, 0, 0.3)';
      case 'scheduled': return 'rgba(0, 191, 255, 0.3)';
      case 'completed': return 'rgba(128, 128, 128, 0.3)';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  }};
`;

const formatPhoneNumber = (phone) => {
  return phone ? phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') : 'N/A';
};

const getStatusColor = (status) => {
  switch (status) {
    case 'new': return { bg: 'rgba(0, 255, 0, 0.2)', border: 'rgba(0, 255, 0, 0.3)' };
    case 'contacted': return { bg: 'rgba(255, 165, 0, 0.2)', border: 'rgba(255, 165, 0, 0.3)' };
    case 'scheduled': return { bg: 'rgba(0, 191, 255, 0.2)', border: 'rgba(0, 191, 255, 0.3)' };
    case 'completed': return { bg: 'rgba(128, 128, 128, 0.2)', border: 'rgba(128, 128, 128, 0.3)' };
    default: return { bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)' };
  }
};

const FilterPopover = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  width: 300px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: var(--color-text);
  font-size: var(--font-size-sm);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  .react-datepicker-wrapper {
    width: auto;
  }

  .react-datepicker {
    background: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-family: inherit;
  }

  .react-datepicker__header {
    background: #242424;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    color: var(--color-text);
  }

  .react-datepicker__day:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .react-datepicker__day--selected {
    background: var(--color-primary);
    color: black;
  }
`;

const DateInput = styled.input`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  width: 120px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const ApplyButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  border: none;
  border-radius: 6px;
  color: black;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
`;

const ActiveFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const FilterTag = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: var(--font-size-xs);

  button {
    background: none;
    border: none;
    padding: 0;
    color: var(--color-text);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filters, setFilters] = useState({
    style: '',
    isFirstTattoo: '',
    location: '',
    startDate: null,
    endDate: null
  });
  
  const filterRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, activeTab, searchTerm, filters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...');
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('Fetched orders:', data);
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => order.status === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => {
        const searchString = `${order.personal_info?.fullName} ${order.personal_info?.email} ${order.tattoo_details?.style}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      });
    }

    // Apply additional filters
    if (filters.style) {
      filtered = filtered.filter(order => 
        order.tattoo_details?.style?.toLowerCase() === filters.style.toLowerCase()
      );
    }

    if (filters.isFirstTattoo) {
      filtered = filtered.filter(order => 
        order.tattoo_details?.isFirstTattoo === filters.isFirstTattoo
      );
    }

    if (filters.location) {
      filtered = filtered.filter(order => 
        order.tattoo_details?.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= filters.startDate && orderDate <= filters.endDate;
      });
    }

    setFilteredOrders(filtered);
  };

  const handleApplyFilters = () => {
    filterOrders();
    setShowFilters(false);
    setShowDatePicker(false);
  };

  const clearFilter = (filterKey) => {
    setFilters(prev => ({ ...prev, [filterKey]: '' }));
  };

  const clearDateRange = () => {
    setFilters(prev => ({ ...prev, startDate: null, endDate: null }));
  };

  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  const handleOrderClick = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <OrdersContainer>
      <Header>
        <H1>Orders</H1>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div ref={filterRef} style={{ position: 'relative' }}>
            <FilterButton 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filter
            </FilterButton>
            
            {showFilters && (
              <FilterPopover
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FilterGroup>
                  <FilterLabel>Style</FilterLabel>
                  <FilterSelect
                    value={filters.style}
                    onChange={(e) => setFilters(prev => ({ ...prev, style: e.target.value }))}
                  >
                    <option value="">All Styles</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Neo-traditional">Neo-traditional</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Black and Grey">Black and Grey</option>
                  </FilterSelect>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel>First Tattoo</FilterLabel>
                  <FilterSelect
                    value={filters.isFirstTattoo}
                    onChange={(e) => setFilters(prev => ({ ...prev, isFirstTattoo: e.target.value }))}
                  >
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </FilterSelect>
                </FilterGroup>

                <ApplyButton
                  onClick={handleApplyFilters}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Filters
                </ApplyButton>
              </FilterPopover>
            )}
          </div>

          <div ref={dateRef} style={{ position: 'relative' }}>
            <FilterButton 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <Calendar size={16} />
              Date
            </FilterButton>

            {showDatePicker && (
              <FilterPopover
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FilterGroup>
                  <FilterLabel>Date Range</FilterLabel>
                  <DateRangeContainer>
                    <DatePicker
                      selected={filters.startDate}
                      onChange={date => setFilters(prev => ({ ...prev, startDate: date }))}
                      selectsStart
                      startDate={filters.startDate}
                      endDate={filters.endDate}
                      placeholderText="Start Date"
                      customInput={<DateInput />}
                    />
                    <span>to</span>
                    <DatePicker
                      selected={filters.endDate}
                      onChange={date => setFilters(prev => ({ ...prev, endDate: date }))}
                      selectsEnd
                      startDate={filters.startDate}
                      endDate={filters.endDate}
                      minDate={filters.startDate}
                      placeholderText="End Date"
                      customInput={<DateInput />}
                    />
                  </DateRangeContainer>
                </FilterGroup>

                <ApplyButton
                  onClick={handleApplyFilters}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Date Range
                </ApplyButton>
              </FilterPopover>
            )}
          </div>
        </SearchBar>
      </Header>

      {/* Show active filters */}
      {(filters.style || filters.isFirstTattoo || (filters.startDate && filters.endDate)) && (
        <ActiveFilters>
          {filters.style && (
            <FilterTag>
              Style: {filters.style}
              <button onClick={() => clearFilter('style')}><X size={12} /></button>
            </FilterTag>
          )}
          {filters.isFirstTattoo && (
            <FilterTag>
              First Tattoo: {filters.isFirstTattoo}
              <button onClick={() => clearFilter('isFirstTattoo')}><X size={12} /></button>
            </FilterTag>
          )}
          {filters.startDate && filters.endDate && (
            <FilterTag>
              Date: {filters.startDate.toLocaleDateString()} - {filters.endDate.toLocaleDateString()}
              <button onClick={clearDateRange}><X size={12} /></button>
            </FilterTag>
          )}
        </ActiveFilters>
      )}

      <TabsContainer>
        <Tab 
          $active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          All ({orders.length})
        </Tab>
        <Tab 
          $active={activeTab === 'new'} 
          onClick={() => setActiveTab('new')}
        >
          New ({getStatusCount('new')})
        </Tab>
        <Tab 
          $active={activeTab === 'contacted'} 
          onClick={() => setActiveTab('contacted')}
        >
          Contacted ({getStatusCount('contacted')})
        </Tab>
        <Tab 
          $active={activeTab === 'scheduled'} 
          onClick={() => setActiveTab('scheduled')}
        >
          Scheduled ({getStatusCount('scheduled')})
        </Tab>
        <Tab 
          $active={activeTab === 'completed'} 
          onClick={() => setActiveTab('completed')}
        >
          Completed ({getStatusCount('completed')})
        </Tab>
      </TabsContainer>

      {error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : (
        <OrdersGrid>
          {filteredOrders.map((order) => {
            const personalInfo = order.personal_info;
            const tattooDetails = order.tattoo_details;
            const statusColors = getStatusColor(order.status);

            return (
              <OrderCard
                key={order.id}
                onClick={() => handleOrderClick(order.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <OrderHeader>
                  <OrderName>{personalInfo?.fullName || 'No Name'}</OrderName>
                  <StatusBadge 
                    $status={order.status} 
                    style={{
                      background: statusColors.bg,
                      borderColor: statusColors.border
                    }}
                  >
                    {order.status || 'New'}
                  </StatusBadge>
                </OrderHeader>

                <OrderDetails>
                  <p>Email: {personalInfo?.email || 'N/A'}</p>
                  <p>Phone: {formatPhoneNumber(personalInfo?.phone)}</p>
                  <p>Style: {tattooDetails?.style || 'N/A'}</p>
                  <p>Size: {tattooDetails?.size || 'N/A'}</p>
                  <OrderDate>
                    {new Date(order.created_at).toLocaleDateString('sl-SI', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </OrderDate>
                </OrderDetails>
              </OrderCard>
            );
          })}
        </OrdersGrid>
      )}
    </OrdersContainer>
  );
};

export default Orders;
