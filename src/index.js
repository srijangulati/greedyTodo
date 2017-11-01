import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';//for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid,Cell} from 'react-mdl/lib/Grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { Draggable, Droppable } from 'react-drag-and-drop';

class App extends React.Component{

  constructor(props){
    super(props);
    injectTapEventPlugin();
    this.state = {
      task:"",
      todo:[],
      done:['asdfas'],
      doing:['adsfsd']
    };
  }

  renderTodos(name){
    const style = {
      height:80,
      width: "100%",
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
      paddingTop: 30
    };
    return this.state[name].map((todo,key)=>
    <Draggable key={key} type={name} data={todo}>
      <Paper style={style} zDepth={4}>
        <div>
          {todo}
        </div>
      </Paper>
      </Draggable>
    );
  }

  addTodo(){
    let todo = this.state.todo;
    todo.push(this.state.task);
    this.setState({todo:todo});
  }

  taskOnChange(task,val){
    this.state.task = val;
  }

  del(from,data){
    for(var i=0;i<this.state[from].length;i++){
      if(this.state[from][i] == data){
        delete this.state[from][i];
      }
    }
  }

  onDrop(type,data){
    console.log(type);
    console.log(data);
    let temp = this.state[type];
    let tempData;
    if(data.done!=""){
      tempData = data.done;
      this.del('done',data.done);
    }
    if(data.doing!=""){
      tempData = data.doing;
      this.del('doing',data.doing);
    }
    if(data.todo!=""){
      tempData = data.todo;
      this.del('todo',data.todo);
    }
    temp.unshift(tempData);
    this.state[type]=temp;
    this.forceUpdate();
  }

  render(){
    return (
      <MuiThemeProvider>
      <div>
      <Grid>
      <Cell col={4} offset={4}>
      <TextField
        hintText="TODO"
        onChange={this.taskOnChange.bind(this)}
      />
      <RaisedButton label="Add" primary={true} onTouchTap={this.addTodo.bind(this)}/>
      </Cell>
      </Grid>
        <Grid>
          <Cell col={4}>
          <Droppable types={['done','doing','todo']} onDrop={this.onDrop.bind(this,'todo')}>
            <h3 style={{textAlign:"center"}}>
              Todo
            </h3>
            <div>
              {this.renderTodos('todo')}
            </div>
            </Droppable>
          </Cell>
          <Cell col={4}>
          <Droppable types={['todo','done','doing']} onDrop={this.onDrop.bind(this,'doing')}>
          <h3 style={{textAlign:"center"}}>
            Doing
          </h3>
          <div>
            {this.renderTodos('doing')}
          </div>
          </Droppable>
          </Cell>
          <Cell col={4}>
          <Droppable types={['todo','doing','done']} onDrop={this.onDrop.bind(this,'done')}>
          <h3 style={{textAlign:"center"}}>
            Done
          </h3>
          <div>
            {this.renderTodos('done')}
          </div>
          </Droppable>
          </Cell>
        </Grid>
      </div>
      </MuiThemeProvider>
    );
  }
}

render(<App/>,document.getElementById('app'));
