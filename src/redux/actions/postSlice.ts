import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Post {
  _id: string;
  sports_id: string;
  description?: string;
  venue_id?: any;
  package?: string;
  activity?: string;
  comments?: [];
}

interface InitialState {
  allPost: Post[];
  loading: boolean;
}

const INITIAL_STATE: InitialState = {
  allPost: [],
  loading: true,
};

const postSlice = createSlice({
  name: 'post',
  initialState: INITIAL_STATE,
  reducers: {
    setAllPost: (state, action: PayloadAction<Post[]>) => {
      state.allPost = action.payload;
    },
    concatPosts: (state, action: PayloadAction<Post[]>) => {
      state.allPost = [...state.allPost, ...action.payload];
    },
    addPosts: (state, action: any) => {
      state.allPost = [action.payload, ...state.allPost];
    },
    updatePostComment: (state, action: any) => {
      const index = state.allPost.findIndex(
        post => post._id === action.payload._id,
      );

      // if (index !== -1) {
      //   state.allPost[index].comments.comments = action.payload.comments;
      //   state.allPost[index].comments.total =
      //     state.allPost[index].comments.total + 1;
      // }
    },
    updatePosts: (state, action: PayloadAction<Post>) => {
      const index = state.allPost.findIndex(
        post => post._id === action.payload._id,
      );
      if (index !== -1) {
        state.allPost[index].sports_id = action.payload.sports_id;
        state.allPost[index].description = action.payload.description;
        state.allPost[index].venue_id = action.payload.venue_id;
        state.allPost[index].package = action.payload.package;
        state.allPost[index].activity = action.payload.activity;
      }
    },
    deletePosts: (state, action: PayloadAction<string>) => {
      state.allPost = state.allPost.filter(post => post._id !== action.payload);
    },
    addCommentInThePost: (state: any, action: any) => {
      const index = state?.allPost.findIndex(
        post => post._id === action.payload?.id,
      );

      if (index !== -1) {
        if (state.allPost[index]?.comments?.comments?.length > 1) {
          state.allPost[index].comments.comments[
            state.allPost[index].comments.comments.length - 1
          ] = action?.payload?.replaceComment;
        } else {
          state.allPost[index].comments.comments.push(
            action?.payload?.replaceComment,
          );
        }
        state.allPost[index].comments.total =
          state.allPost[index].comments.total + 1;
      }
    },
    deleteCommentInThePost: (state: any, action: any) => {
      const index = state?.allPost.findIndex(
        post => post._id === action.payload?.postId,
      );

      if (index !== -1) {
        let filterComments = state.allPost[index].comments.comments.filter(
          val => val._id !== action.payload?.commentId,
        );

        state.allPost[index].comments.comments = filterComments;
      }
    },
  },
});

const {
  setAllPost,
  updatePostComment,
  concatPosts,
  addPosts,
  updatePosts,
  deletePosts,
  addCommentInThePost,
  deleteCommentInThePost,
} = postSlice.actions;
const PostReducer = postSlice.reducer;

export {
  setAllPost,
  concatPosts,
  addPosts,
  updatePosts,
  deletePosts,
  PostReducer,
  updatePostComment,
  addCommentInThePost,
  deleteCommentInThePost,
};
export default postSlice;
