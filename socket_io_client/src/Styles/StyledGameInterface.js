import styled from 'styled-components';

export const StyledNotification = styled.div`
#hoverme {
    background: #70c48f;
    color: white;
    padding: 5px;
    text-decoration: none;
  }
  
  .visible {
    animation: movein 0.5s ease forwards, moveout 0.5s 3s ease forwards;
  }
  
  #notif {
    width: 200px;
    height: 100px;
    background: #70c48f;
    color: white;
    border-radius: 3px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 100px;
    left: -200px;
  }
  
  /*#notif {
    left: 10px;
    opacity: 0;
  }*/
  
  @keyframes movein {
    from { left: -200px; }
    to   { left: 10px; }
  }
  
  @keyframes moveout {
    from { left: 10px; }
    to   { left: -200px; }
  }
  
  /*@keyframes movein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  
  @keyframes moveout {
    from { opacity: 1; }
    to   { opacity: 0; }
  }*/
  
`