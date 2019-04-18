import React from "React";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Comments from "./Comments";
import CommentsStub from "../../../../stubs/Comments";
import CurrentUserStub from "../../../../stubs/CurrentUser";

Enzyme.configure({adapter: new Adapter()});

describe("When current User is provided", ()=>{
  var wrapper;
  beforeEach(() => {
    const commentsComponent = <Comments 
      currentUser = {CurrentUserStub}
      comments = {CommentsStub}
    />
    wrapper = shallow(commentsComponent);
  });
  test("it renders", ()=>{
    expect(wrapper.exists()).toBe(true);
  })
  test("it should show comment form", ()=>{
    expect(wrapper.exists('textarea[name="newComment"]')).toBe(true);
  })
})

describe("When no current User", ()=>{
  var wrapper;
  beforeEach(() => {
    const commentsComponent = <Comments 
      comments = {CommentsStub}
    />
    wrapper = shallow(commentsComponent);
  });

  test("renders", ()=>{
    expect(wrapper.exists()).toBe(true);
  })
  test("it should not show comment form", ()=>{
    expect(wrapper.exists('textarea[name="newComment"]')).toBe(false);
  })

})