import {render,screen} from '@testing-library/react'
import JoinGame from './Components/JoinGame'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reducer from "./Store/reducers/index"
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
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


render(
    <Provider store={store}>
        <JoinGame/>
    </Provider>
    )

    screen.debug();
})