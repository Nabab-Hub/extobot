import React, { useEffect, useState } from 'react'
import './Home.css'
import { NavLink } from 'react-router-dom'

export default function Home() {

    return (
        <div className="home-page">
            <h2>This is Home Page </h2>

            <h3 style={{marginTop:"5rem"}}>Interviews</h3>
            <ul style={{marginLeft: "5rem"}}>
              <li><NavLink to="/interviews/slot1">Slot1</NavLink></li>
              <li><NavLink to="/interviews/slot2">Slot2</NavLink></li>
              <li><NavLink to="/interviews/slot3">Slot3</NavLink></li>
              <li><NavLink to="/interviews/slot4">Slot4</NavLink></li>
              <li><NavLink to="/interviews/slot5">Slot5</NavLink></li>
            </ul>
        </div>
    )
}
