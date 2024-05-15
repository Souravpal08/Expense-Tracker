'use client'
import React, {useState, useEffect} from 'react'
import { collection, addDoc,getDoc, querySnapshot, query,onSnapshot,doc, deleteDoc } from "firebase/firestore"; 
import {db} from './firebase'

export default function Home() {
 const [items, setItems]= useState([
 // {name:'Cloths', price: 6.85},
  //{name:'Moovie', price: 2.50},
  //{name:'Dinner', price: 8.85}
 ])
 const [newItem, setNewItem]= useState({name:'', price:''})
 const [total, setTotal]= useState(0);

 //add item to database
  const addItem= async (e)=>{
    e.preventDefault()
    if(newItem.name !== ' ' && newItem.price !== ''){
    //  setItems([...items, newItem])
    await addDoc(collection(db, 'items'),{
      name: newItem.name.trim(),
      price:newItem.price
    })
    
  }
};
//read item from database

useEffect(()=>{
   const q= query(collection(db, 'items'))
   const unsubscribe= onSnapshot (q, (querySnapshot)=>{
    let itemsArr= []

    querySnapshot.forEach((doc) => {
     itemsArr.push({...doc.data(), id:doc.id}) 
    });
    setItems(itemsArr);

    //read total from list of items
    const calculateTotal = ()=>{
      const totalPrice = itemsArr.reduce((sum, item) => sum+ parseFloat(item.price), 0)
      setTotal(totalPrice)
    }
    calculateTotal()
    return () => unsubscribe();
   })
},[])

//deleteitem from list
 const deleteitem = async (id) =>{
  await deleteDoc(doc(db, 'items', id))
 }
  


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-5">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
       <h1 className="text-5xl p-4 text-center">Expense Tracker</h1>
       <div className="bg-slate-700 p-6 rounded-lg ">
        <form className="grid grid-cols-5 items-center text-black ">
          <input
           value={newItem.name}
           onChange={(e)=>setNewItem({...newItem, name:e.target.value})}
           className="col-span-3 p-3 border" type="text" placeholder="Add item" />
          <input 
          value={newItem.price}
          onChange={(e)=>setNewItem({...newItem, price:e.target.value})}
          className="col-span-2 p-3 border mx-5 " type="number" placeholder="Enter price $"/>
          <button
           onClick={addItem}
           className="text-white bg-slate-950 text-xl hover:bg-slate-800 p-3 mx-2 flex justify-center my-2" type="submit"> +</button>
        </form>
         <ul>
          {items.map((item, id) =>
          (
            <li key={id} className='my-2 w-full flex justify-between text-white bg-slate-950'>
              <div className='p-4 w-full flex justify-between'>
                <span className='capitalize'>{item.name}</span>
                <span>${item.price}</span>
              </div>
              <button onClick={()=>deleteitem(item.id)} className='ml-6 p-4 border-l-4 border-slate-800 hover:bg-slate-800 w-16 '>X</button>
            </li>
          )
          )}
         </ul>
          {items.length<1 ? (
            ''
          ):(
            <div className='flex justify-between p-5 text-xl text-sky-500'>
              <span> Toatal</span>
              <span>${total}</span>
            </div>
          )}
       </div>
        
      </div>
    </main>
  );
}
