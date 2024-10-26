import { supabase } from '../config/supabase';

export async function saveOrder(formData) {
  try {
    console.log('Saving order with data:', formData);
    
    // Create the order object
    const orderData = {
      personal_info: formData.personalInfo,
      tattoo_details: formData.tattooDetails,
      tattoo_idea: formData.tattooIdea,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Formatted order data:', orderData);

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Order saved successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error saving order:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to save order'
    };
  }
}

// Helper function to get all orders
export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: error.message };
  }
}

// Helper function to get a single order
export async function getOrder(orderId) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: error.message };
  }
}

// Helper function to update an order
export async function updateOrder(orderId, updates) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: error.message };
  }
}
