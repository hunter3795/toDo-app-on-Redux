import './MainPage.css'
import React from "react";
import {AddToDoForm} from "@features/index";
import {ToDoList} from "@widgets/index";


const MainPage = () => {
  return (
    <div className="app-wrapper"> 
      <header>
        <h1>Taskify</h1>
      </header>
      <main>
        <h2>Plan. Do. Repeat</h2>
        <AddToDoForm />
        <ToDoList />
      </main>
      <footer>
        <div className="footer-content">
          <p>© 2025 Taskify. All rights reserved.</p>
          <a className="footer-link" href='https://github.com/hunter3795'>GitHub</a>
        </div>
      </footer>
    </div>
  )
}

export default MainPage
