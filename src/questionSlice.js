import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list : []
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    add : function(state,actions){
      state.list.push(actions.payload);
    },
    deleted : function(state,actions){
      state.list.splice(actions.payload,1);
    },
    edit : function(state,actions){
      state.list[actions.payload.index].question = actions.payload.question;
      state.list[actions.payload.index].rule  = actions.payload.rule;
      state.list[actions.payload.index].answer = actions.payload.answer;
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, deleted,edit} = questionSlice.actions

export default questionSlice.reducer