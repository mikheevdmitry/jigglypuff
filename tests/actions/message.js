import configureMockStore from 'redux-mock-store'
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from 'actions/message';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Message', () => {
  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  it('create action to set field in message', () => {
    const field = 'title';
    const value = 'kekpek my body text';
    const expectedAction = {
      type: actions.SET_FIELD,
      field,
      value
    };

    expect(actions.setField(field, value)).toEqual(expectedAction);
  });

  it('create action to submit message', () => {
    const expectedAction = { type: actions.SUBMIT_MESSAGE };

    expect(actions.submitMessage()).toEqual(expectedAction);
  });

  it('create action to clear message', () => {
    const message = 'Message saved to drafts';
    const status = 'success';
    const expectedAction = {
      type: actions.CLEAR_MESSAGE,
      message,
      status
    };

    expect(actions.clearMessage()).toEqual(expectedAction);
  });

  it('create async action to send message', () => {
    server.respondWith('POST', 'http://localhost:3000/messages',
      [201, { "Content-Type": "application/json" }, '']);

    const message = 'Message saved to drafts';
    const status = 'success';
    const expectedAction = [{ type: actions.CLEAR_MESSAGE, message, status }];
    const store = mockStore();
    const req = store.dispatch(actions.sendMessage());

    server.respond();
    return req.then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
