import {fireEvent, render,screen} from '@testing-library/react'
// import JoinGame from './Components/JoinGame'
import App from './App'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reducer from "./Store/reducers/index"
import { Provider } from 'react-redux';
import JoinGame from './Components/JoinGame';
import connect from "./Utilitys/Connect"

const mockStore = configureMockStore([thunk]);
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => jest.fn(),
}))

describe("it should render", () => {
    
//#region store
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
//#endregion
// const onSubmit = jest.fn();

// const Connect = jest.spyOn(connect);
it('should render', () => {
    render(
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
    })
  })
    // test("input working", () => {
    // })
    // screen.debug();
