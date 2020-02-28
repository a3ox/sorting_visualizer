import React from 'react'
import './SortingVisualizer.css'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 350; i++) {
            array.push(randomIntFromInterval(5, 800))
        }
        this.setState({array})
    }

    mergeSort() {}

    bubbleSort() {}

    quickSort() {}
    
    heapSort() {}
    
    radixSort() {}

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar"
                        key={idx}
                        style={{height: `${value}px`}}> 
                    </div>
                ))} 
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.radixSort()}>Radix Sort</button>
            </div>
        );
      }

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}