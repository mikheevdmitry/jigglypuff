import configureMockStore from 'redux-mock-store'
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from 'actions/messages';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Messages actions', () => {
  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  it('create action to fetch messages', () => {
    server.respondWith('GET', 'http://localhost:3000/messages?type=inbox',
      [200, { "Content-Type": "application/json" }, '[{ "id": "0", "title": "Lorem" }]']);

    const expectedActions = [
      {
        type: actions.MAKE_REQUEST,
        messageType: 'inbox'
      },
      {
        type: actions.RECEIVE_MESSAGES,
        items: [{ id: '0', title: 'Lorem' }]
      }
    ];
    const store = mockStore({ items: [] });
    const req = store.dispatch(actions.fetchMessages('inbox'));
    server.respond();

    return req.then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('create action to make request', () => {
    const expectedAction = {
      type: actions.MAKE_REQUEST,
      messageType: 'inbox'
    };

    expect(actions.makeRequest('inbox')).toEqual(expectedAction);
  });

  it('create action to receive messages', () => {
    const items = [{
      id: 1,
      title: "Grenada",
      author: "Elnora_Klein18",
      body: 'Kek'
    }];
    const expectedAction = {
      items,
      type: actions.RECEIVE_MESSAGES
    };

    expect(actions.receiveMessages(items)).toEqual(expectedAction);
  });

  it('create action to receive message', () => {
    const message = 'Receive message';
    const expectedAction = {
      message,
      type: actions.RECEIVE_MESSAGE
    };

    expect(actions.receiveMessage(message)).toEqual(expectedAction);
  });

  it('create action to update message', () => {
    const message = 'update message';
    const expectedAction = {
      message,
      type: actions.UPDATE_MESSAGE
    };

    expect(actions.updateMessage(message)).toEqual(expectedAction);
  });

  it('create action to select message', () => {
    const id = 0;
    const expectedAction = {
      id,
      type: actions.SELECT_MESSAGE
    };

    expect(actions.selectMessage(id)).toEqual(expectedAction);
  });

  it('create action to mark message as important', () => {
    const expectedAction = {
      type: actions.MARK_IMPORTANT
    };

    expect(actions.markImportant()).toEqual(expectedAction);
  });

  it('create action to delete message', () => {
    const id = 0;
    const expectedAction = {
      id,
      type: actions.DELETE_MESSAGE
    };

    expect(actions.deleteMessageFromStore(id)).toEqual(expectedAction);
  });

  it('create action to hide notification', () => {
    const expectedAction = {
      type: actions.HIDE_NOTIFICATION
    };;

    expect(actions.hideNotification()).toEqual(expectedAction);
  });
});
