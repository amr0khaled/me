import TerminalPane from "@/components/terminal";
import Tmux from "@/components/tmux";


export default function Trial() {
  return (
    <>
      <div className='main-container' id="mainPage">
        <div className="side-panes" id='leftSide'>
          <TerminalPane className='pane' />
          <Tmux className='pane' />
        </div>
        <div className="side-panes" id='rightSide'>
          <div className='pane' id='browser'></div>
        </div>
      </div>
    </>
  )
}
