import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { H1 } from '../../components/Typography';
import { ArrowLeft, Save } from 'react-feather';
import { AnimatePresence } from 'framer-motion';

const Container = styled.div`
  width: 100%;
  max-width: var(--admin-max-width);
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  margin-bottom: 1rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-size: var(--font-size-sm);
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
  }

  p {
    font-size: var(--font-size-base);
  }
`;

const StatusSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const SaveButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  border: none;
  border-radius: 8px;
  color: black;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: zoom-in;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  cursor: zoom-out;

  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!auth?.currentUser) {
          console.log('Waiting for auth...');
          return;
        }

        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error('Order not found');
        }

        const data = docSnap.data();
        console.log('Fetched order:', data);
        setOrder(data);
        setStatus(data.status || 'new');
        setNotes(data.notes || '');
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.currentUser) {
      fetchOrder();
    }
  }, [orderId, auth?.currentUser]);

  const handleSave = async () => {
    try {
      if (!auth?.currentUser) {
        throw new Error('Not authenticated');
      }

      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, {
        status,
        notes,
        updated_at: new Date().toISOString()
      });
      // Show success message
    } catch (error) {
      console.error('Error updating order:', error);
      // Show error message
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  // Destructure the parsed data
  const { personal_info, tattoo_details, tattoo_idea } = order;

  return (
    <Container>
      <Header>
        <BackButton
          onClick={() => navigate('/admin/orders')}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Back to Orders
        </BackButton>
      </Header>

      <H1>{personal_info?.fullName || 'No Name'}</H1>

      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        <Field>
          <label>Email</label>
          <p>{personal_info?.email || 'N/A'}</p>
        </Field>
        <Field>
          <label>Phone</label>
          <p>{personal_info?.phone || 'N/A'}</p>
        </Field>
        <Field>
          <label>Birth Date</label>
          <p>{personal_info?.birthDate || 'N/A'}</p>
        </Field>
      </Section>

      <Section>
        <SectionTitle>Tattoo Details</SectionTitle>
        <Field>
          <label>Size</label>
          <p>{tattoo_details?.size || 'N/A'}</p>
        </Field>
        <Field>
          <label>Location</label>
          <p>{tattoo_details?.location || 'N/A'}</p>
        </Field>
        <Field>
          <label>Style</label>
          <p>{tattoo_details?.style || 'N/A'}</p>
        </Field>
        <Field>
          <label>First Tattoo</label>
          <p>{tattoo_details?.isFirstTattoo === 'yes' ? 'Yes' : 'No'}</p>
        </Field>
        {tattoo_details?.locationImage && (
          <Field>
            <label>Location Image</label>
            <ImageGrid>
              <ImageContainer>
                <Image 
                  src={tattoo_details.locationImage} 
                  alt="Tattoo location"
                  onClick={() => handleImageClick(tattoo_details.locationImage)}
                  loading="lazy"
                />
              </ImageContainer>
            </ImageGrid>
          </Field>
        )}
      </Section>

      <Section>
        <SectionTitle>Tattoo Idea</SectionTitle>
        <Field>
          <label>Description</label>
          <p>{tattoo_idea?.description || 'N/A'}</p>
        </Field>
        {tattoo_idea?.referenceImages?.length > 0 && (
          <Field>
            <label>Reference Images</label>
            <ImageGrid>
              {tattoo_idea.referenceImages.map((image, index) => (
                <ImageContainer key={index}>
                  <Image 
                    src={image} 
                    alt={`Reference ${index + 1}`}
                    onClick={() => handleImageClick(image)}
                    loading="lazy"
                  />
                </ImageContainer>
              ))}
            </ImageGrid>
          </Field>
        )}
      </Section>

      <Section>
        <SectionTitle>Order Management</SectionTitle>
        <Field>
          <label>Status</label>
          <StatusSelect 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </StatusSelect>
        </Field>
        <Field>
          <label>Notes</label>
          <NotesTextarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this order..."
          />
        </Field>
        <SaveButton
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={16} />
          Save Changes
        </SaveButton>
      </Section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.img
              src={selectedImage}
              alt="Full size image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
          </ImageModal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default OrderDetails;
