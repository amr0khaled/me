
import '@/style/layout/app.css'
import Terminal from './components/terminal'

function App() {
  return (
    <div className='main-container' id="mainPage">
      <div className="side-panes" id='leftSide'>
        <Terminal className='pane' />
        <div className='pane' id='terminal'></div>
      </div>
      <div className="side-panes" id='rightSide'>
        <div className='pane' id='browser'></div>
      </div>
    </div>
  )
}

export default App
