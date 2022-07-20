import React, { useEffect, useState } from 'react'
import './game.css'
import { loadWeb3 } from '../game/api/api'
import { pegaxygameContractAddress, pegaxygameContractAddress_Abi } from './utilities/Contract'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


/*
Assignment: Javascript Assignment
Filename: game.js
@author: KITSANTAS FOTIOS (17421808)
Date: 30/04/17
*/

/*Create a Javascript Object for a horse with 3 parameters: HTML ID, position x and y*/

//  export function myfunction(){
// let myvariable= true
//  }
// import $ from 'jquery'


// const Result = () => {
//     return (<>

//         <table id="results">
//             <thead>
//                 <tr>
//                     <th>Results</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>1st</td>
//                     <td className="result horse1"></td>
//                 </tr>
//                 <tr>
//                     <td>2nd</td>
//                     <td className="result horse2"></td>
//                 </tr>
//                 <tr>
//                     <td>3rd</td>
//                     <td className="result horse3"></td>
//                 </tr>
//                 <tr>
//                     <td>4th</td>
//                     <td className="result horse4"></td>
//                 </tr>
//             </tbody>
//         </table>
//     </>)
// }
const Pegaxy_Game = () => {


    const [show, setShow] = useState(false);
    const [reult, setresult] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };

    async function connectwallet() {
        const web3 = window.web3;

        let acc = await loadWeb3()



    }
    const test = async () => {
        const web3 = window.web3;

        let pegaxyContractOf = new web3.eth.Contract(pegaxygameContractAddress_Abi, pegaxygameContractAddress);

        let owner = await pegaxyContractOf.methods._owner().call();

    }
    const startRace = async () => {
        const web3 = window.web3;
        let acc = await loadWeb3();
        // console.log("what is acc",acc)
        let pegaxyContractOf = new web3.eth.Contract(pegaxygameContractAddress_Abi, pegaxygameContractAddress);

        let startrace = await pegaxyContractOf.methods.StartRace(acc, 1).send({
            from: acc
        }

        )
        console.log("start race ", startrace)
    }




    function Horse(id, x, y) {
        this.element = document.getElementById(id);/*HTML element of the horse*/
        this.speed = Math.random() * 10 + 10; /*Initiate a random speed for each horse, the greater speed, the faster horse. The value is between 10 and 20*/
        this.originX = x;/*Original X position*/
        this.originY = y;/*Original Y position*/
        this.x = x; /*Current X*/
        this.y = y; /*Current Y*/
        this.number = parseInt(id.replace(/[\D]/g, '')); /*Number of horse, number will be 1 or 2 or 3 or 4*/
        this.lap = 0; //Current lap of the horse

        this.moveRight = function () {
            var horse = this;/*Assign horse to this object*/

            /*Use setTimeout to have the delay in moving the horse*/
            setTimeout(function () {
                //Move the horse to right 1vw
                horse.x++;
                horse.element.style.left = horse.x + 'vw';

                //Check if goes through the start line, if horse runs enough number of laps and has pass the start line then stop
                if (horse.lap == num_lap && horse.x > horse.originX + 6) {
                    horse.arrive();
                } else {
                    //Make decision to move Down or not
                    //The width of the Down Road is 10wh, then the distance of each horse is 2.5vw (4 horses). The right position of the road is 82.5vw
                    //Continue to move right if not reach the point to turn
                    if (horse.x < 82.5 - horse.number * 2.5) {
                        horse.moveRight();
                    } else {
                        //Change HTML class of horse to runDown
                        horse.element.className = 'horse runDown';
                        //Change the speed, will be random value from 10 to 20
                        horse.speed = Math.random() * 10 + 10;
                        horse.moveDown();
                    }
                }

            }, 1000 / this.speed);
            /* 1000/this.speed is timeout time*/
        }

        /*Do the same for moveDown, moveLeft, moveUp*/
        this.moveDown = function () {
            var horse = this;
            setTimeout(function () {
                horse.y++;
                horse.element.style.top = horse.y + 'vh';
                if (horse.y < horse.originY + 65) {
                    horse.moveDown();
                } else {
                    horse.element.className = 'horse runLeft';
                    horse.speed = Math.random() * 10 + 10;
                    horse.moveLeft();
                }
            }, 1000 / this.speed)
        }
        this.moveLeft = function () {
            var horse = this;
            setTimeout(function () {
                horse.x--;
                horse.element.style.left = horse.x + 'vw';
                if (horse.x > 12.5 - horse.number * 2.5) {
                    horse.moveLeft();
                } else {
                    horse.element.className = 'horse runUp';
                    horse.speed = Math.random() * 10 + 10;
                    horse.moveUp();
                }
            }, 1000 / this.speed)
        }
        this.moveUp = function () {
            var horse = this;
            setTimeout(function () {
                horse.y--;
                horse.element.style.top = horse.y + 'vh';
                if (horse.y > horse.originY) {
                    horse.speed = Math.random() * 10 + 10;
                    horse.moveUp();
                    // myfunction();

                } else {
                    horse.element.className = 'horse runRight';
                    //Nearly finish the lap
                    horse.lap++;
                    horse.moveRight();


                }
            }, 1000 / this.speed)
        }

        /*Trigger the horse by run*/
        this.run = function () {

            this.element.className = 'horse runRight';
            this.moveRight();
        }

        this.arrive = function () {


            // count = count + 1;
            // if (count === 4) {
            //     handleShow()


            // }

            //Stop the horse run by change class to standRight
            this.element.className = 'horse standRight';

            this.lap = 0;//Reset the lap


            /*Show the result*/
            var tds = document.querySelectorAll('#results .result');//Get all table cell to display the result
            // console.log("what is tds", tds)
            //results.length is the current arrive position
            tds[results.length].className = 'result horse' + this.number;//The class of result look like: result horse1...
          
            //Push the horse number to results array, according the the results array, we know the order of race results
        //   console.log("what is this number",this.number)
            results.push(this.number);
           setresult([...tds])
           console.log("what is the value",reult)
            console.log("what is reult", results.length)
            if (results.length == 4) {
                // handleShow()
            }

            //Win horse
            if (results.length == 1) {
                //If win horse is the bet horse, then add the fund
                if (this.number == bethorse) {
                    alert('You win')
                    funds += amount;
                } else {
                    alert("you lose")
                    funds -= amount;
                }
                document.getElementById('funds').innerText = funds;
            } else if (results.length == 4) {

                //All horse arrived, enable again the Start Button
                document.getElementById('start').disabled = false;

            }

        }
    }

    var num_lap = 1, results = [], funds = 500, bethorse, amount;
    var count = 0;

    //
    function initialized() {

        document.getElementById('funds').innerText = funds;

        // console.log("what is init");
        var horse1 = new Horse('horse1', 20, 4);
        var horse2 = new Horse('horse2', 20, 8);
        var horse3 = new Horse('horse3', 20, 12);
        var horse4 = new Horse('horse4', 20, 16);

        //Event listener to the Start button
        document.getElementById('start').onclick = function () {
            amount = parseInt(document.getElementById('amount').value);
            num_lap = parseInt(document.getElementById('num_lap').value);
            bethorse = parseInt(document.getElementById('bethorse').value);

            if (funds < amount) {
                alert('Not enough funds.');
            }
            else if (num_lap <= 0) {
                alert('Number of lap must be greater than 1.');
            } else {

                /*Started the game*/
                this.disabled = true;/*Disable the start button*/
                var tds = document.querySelectorAll('#results .result');//Get all cells of result table.
                for (var i = 0; i < tds.length; i++) {
                    tds[i].className = 'result';//Reset the result.
                }

                results = [];//Results array is to save the horse numbers when the race is finished.
                horse1.run();
                horse2.run();
                horse3.run();
                horse4.run();

            }
        }

    };
    useEffect(() => {
        initialized()


    }, [1])

    useEffect(() => {
        initialized()
        connectwallet()
        test()

    }, [])




    return (
        <div>


            <body>
                {/* {value? setShow(true):""} */}
                {/* <button onClick={() => startRace()}>click me</button> */}

                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table id="results">
                            <thead>
                                <tr>
                                    <th>Results</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1st</td>
                                    <td className="result horse1"></td>
                                </tr>
                                <tr>
                                    <td>2nd</td>
                                    <td className="result horse2"></td>
                                </tr>
                                <tr>
                                    <td>3rd</td>
                                    <td className="result horse3"></td>
                                </tr>
                                <tr>
                                    <td>4th</td>
                                    <td className="result horse4"></td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
                <div id="horse1" className="horse standRight">
                    <div className="rider">
                        <div className="head">
                        </div>
                        <div className="body">
                        </div>
                    </div>
                </div>


                <div id="horse2" className="horse standRight">
                    <div className="rider">
                        <div className="head">
                        </div>
                        <div className="body">
                        </div>
                    </div>
                </div>


                <div id="horse3" className="horse standRight">
                    <div className="rider">
                        <div className="head">
                        </div>
                        <div className="body">
                        </div>
                    </div>
                </div>


                <div id="horse4" className="horse standRight">
                    <div className="rider">
                        <div className="head">
                        </div>
                        <div className="body">
                        </div>
                    </div>
                </div>


                <div className="track">
                    <div id="startline">
                    </div>

                    <div className="inner">



                        <button id="start">Start Race</button>


                        <div id="bet">
                            <p>You currently have <span id="funds"></span></p>
                            <label>Bet Amount <b>($)</b></label>
                            <input type="number" id="amount" defaultValue={0} />
                            <label>Bet on horse:</label>
                            <select id="bethorse">
                                <option value="1">White</option>
                                <option value="2">Blue</option>
                                <option value="3">Green</option>
                                <option value="4">Brown</option>
                            </select>
                            <label>Number of lap</label>
                            <input type="number" id="num_lap" name="num_lap" defaultValue={1} />
                        </div>

                        <br />

                        <table id="results">
                            <thead>
                                <tr>
                                    <th>Results</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1st</td>
                                    <td className="result horse1"></td>
                                </tr>
                                <tr>
                                    <td>2nd</td>
                                    <td className="result horse2"></td>
                                </tr>
                                <tr>
                                    <td>3rd</td>
                                    <td className="result horse3"></td>
                                </tr>
                                <tr>
                                    <td>4th</td>
                                    <td className="result horse4"></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </body>


        </div>
    )
}

export default Pegaxy_Game