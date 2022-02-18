import {fireEvent, render,screen} from '@testing-library/react'
import { Provider } from 'react-redux';
import JoinGame from '../../Components/JoinGame';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    joinGame: {
      alert: {
        value: false,
        message: ''
      },
      name: 'name'
    },
    GameInterface: {
      joined: false,
      sockets: {},
      user_id: null,
      roomName: null,
      data: {},
      score: 0,
      lines: 0,
      grid: [],
      display: [],
      gameOver: false,
      host: false,
      winner: false
    },
    Nav: {
      GameStart: false,
      alert: {
        show: false,
        message: '',
        type: ''
      }
    },
    Users: {
      users: {}
    },
    SnackBar: {
      snackBar: {
        show: false,
        message: '',
        time: 2000,
        vertical: 'top',
        horizontal: 'left'
      }
    },
    Overlay: {
      overlay: {
        show: false,
        message: ''
    }
}
})


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => jest.fn(),
   useLocation: () => jest.fn(),
 }))
describe('joingame unit test', () => {
it('should render', () => {
    const wrapper = render(
          <Provider store={store}>
              <JoinGame/>
          </Provider>
          )
        expect(screen.getByText(/Join\/Create a game/i)).toBeTruthy();
        const username = screen.getByPlaceholderText(/username/i);
        fireEvent.change(username, {target: {value: 'sasa'}});
        expect(screen.getByPlaceholderText(/username/i).value).toBe('sasa');
        const room = screen.getByPlaceholderText(/room/i);
        fireEvent.change(room, {target: {value: 'roro'}});
        expect(screen.getByPlaceholderText(/room/i).value).toBe('roro');
        // const spy = wrapper.instance();
        // fireEvent.click(screen.getByText("submit"));
    })
  })