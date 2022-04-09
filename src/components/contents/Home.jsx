import React, {useState, useEffect} from 'react'
import './Home.css'




const Home = () => {
    const [inputData, setInputData]=useState("");
    const [items, setItems]=useState([]);

    //add the items function
    const addItem = () => {
        if(!inputData) {
            alert('fill the data')
        } else {
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData])
            setInputData("");
        }
    };

    //how to delete items section
    const deleteItem = (index) => {
        const updatedItem = items.filter((curElm) => {
            return curElm.id !== index;
        });
        setItems(updatedItem);
    };

    //remove all elements
    const removeAll = () => {
        setItems([]);
    };

    //adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items]);

  return (
    <div>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="" alt="todo-logo" />
                    <figcaption>
                        Add your List
                    </figcaption>
                </figure>

                <div className='addItems'>
                    <input type="text" 
                    placeholder='Add Item'
                    className='form-control'
                    value={inputData}
                    onChange={(event) => setInputData(event.target.value)}
                    />
                    <i className='add-btn' onClick={addItem}>+</i>
                </div>

                {/*SHOW OUR ITEMS */}
                <div className='showItems'>
                    {items.map((curElm) => {
                        return (
                            <div className='eachItem' key={curElm.id}>
                                <h3>{curElm.name}</h3>
                                <div className='todo-btn'>
                                    <i>edit</i>
                                    <i onClick={() => deleteItem(curElm.id)}>-</i>
                                </div>
                            </div>
                        )
                    })}

                </div>

                {/*DELETE ALL ITEMS */}
                <div className='showItems'>
                    <button className='del-btn' onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Home