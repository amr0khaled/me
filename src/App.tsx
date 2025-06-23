
import '@/style/layout/app.css'
import Terminal from './components/terminal'
import Tmux from './components/tmux'

function App() {
  return (
    <div className='main-container' id="mainPage">
      <div className="side-panes" id='leftSide'>
        <Terminal className='pane' />
        <Tmux className='pane' />
      </div>
      <div className="side-panes" id='rightSide'>
        <div className='pane' id='browser'></div>
      </div>
    </div>
  )
}

export default App
