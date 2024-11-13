import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function saveOrder(formData) {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      personal_info: formData.personalInfo,
      tattoo_details: formData.tattooDetails,
      tattoo_idea: formData.tattooIdea,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return { success: true, data: { id: docRef.id } };
  } catch (error) {
    console.error('Error saving order:', error);
    return { success: false, error: error.message };
  }
}

// Update getOrders to use Firebase
export async function getOrders() {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: error.message };
  }
}

// Update getOrder to use Firebase
export async function getOrder(orderId) {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Order not found');
    }

    return { 
      success: true, 
      data: { id: docSnap.id, ...docSnap.data() }
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: error.message };
  }
}

// Update updateOrder to use Firebase
export async function updateOrder(orderId, updates) {
  try {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, {
      ...updates,
      updated_at: new Date().toISOString()
    });

    const updatedDoc = await getDoc(docRef);
    return { 
      success: true, 
      data: { id: updatedDoc.id, ...updatedDoc.data() }
    };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: error.message };
  }
}
