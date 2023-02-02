import {
    createSlice,
    createAsyncThunk
  } from '@reduxjs/toolkit'
  const medicalfactory = createSlice({
    name: "medicalGoods",
    initialState: {
      goodlist: [{
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }, {
        key: 4,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: 5,
        name: 'Jonny',
        age: 22,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: 6,
        name: 'Jack',
        age: 19,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }, {
        key: 7,
        name: 'Smith',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: 8,
        name: 'kiKi',
        age: 22,
        address: '上海市普陀区海洋公园',
        tags: ['programer'],
      },
      {
        key: 9,
        name: 'Nancy',
        age: 24,
        address: 'China No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }, {
        key: 10,
        name: 'John li',
        age: 35,
        address: 'jinJiang Zone',
        tags: ['shy', 'selfish'],
      },
      {
        key: 11,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: 12,
        name: 'JoeBlack',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }
      ],
      mapList: []
    },
    reducers: {
      add: (state, action) => {
        state.goodlist.push(action.payload)
      },
      deleteOne: (state, action) => {
        // console.log("哈哈"+ action.payload);
        state.goodlist.splice(action.payload - 1, 1)
      },
      updateOne: (state, action) => {
        state.goodlist[action.payload.key - 1] = action.payload
      },
      saveOne: (state, action) => {
        state.mapList = action.payload
      } 
    }
  })
  export const { add, deleteOne, updateOne, saveOne } = medicalfactory.actions
  
  export default medicalfactory.reducer