import React, { useEffect, useState } from 'react'
import './game.css'
import '../../components/modal.css'
import { loadWeb3 } from '../game/api/api'
import { pegaxygameContractAddress, pegaxygameContractAddress_Abi } from './utilities/Contract'

import { initialized } from './script.js'



const Pegaxy_Game = () => {

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // useEffect(()=>{setShow(true)},[])


    async function connectwallet() {
        const web3 = window.web3;
        // console.log(web3)
        let acc = await loadWeb3()

        // alert(acc)
      
    }
    const test =async()=>{
        const web3 = window.web3;

        let pegaxyContractOf = new web3.eth.Contract(pegaxygameContractAddress_Abi, pegaxygameContractAddress);
        // console.log("what is contract of ",pegaxyContractOf)
        let alldata = await pegaxyContractOf.methods._owner().call();
console.log("all data",alldata)
    }

    useEffect(() => {
        initialized()
        connectwallet()
test()


    }, [])
    


    return (
        <div>


            <body>
                {/* {value? setShow(true):""} */}

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