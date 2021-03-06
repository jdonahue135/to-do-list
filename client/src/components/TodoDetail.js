import React from "react"
import TextareaAutosize from 'react-textarea-autosize';
import moment from "moment";

import TodoItem from "./TodoItem";
import Priority from "./Priority";
import SubTask from "./SubTask";

class TodoDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            notes: "",
        };
    };
    componentDidMount() {
        this.setState({
            title: this.props.todo.title,
            notes: this.props.todo.notes
        });
    };
    componentDidUpdate(prevProps) {
        if (this.props.todo !== prevProps.todo)
        this.setState({
            title: this.props.todo.title,
            notes: this.props.todo.notes
        });
    };
    handleTitleChange(e) {
        if (this.state.title.length === 0 && e.target.value.trim().length === 0) {
            return;
        } else {
            this.setState({title: e.target.value});
        };
    }
    handleNotesChange(e) {
        this.setState({notes: e.target.value.trim()});
    };
    handleSubmit(e) {
        if (this.state[e.target.id] !== this.props.todo[e.target.id]) {
            this.props.onChange(e);
        };
    };
    render() {
        const priorityClass = this.props.todo.priority === true ? " high-priority" : "";
        return (
            <div className="todo-detail-container list">
                <div className="todo-detail-header">
                    <TextareaAutosize 
                        className="text-area-autosize todo-title" 
                        id="title" 
                        maxLength={50} 
                        value={this.state.title} 
                        onChange={this.handleTitleChange.bind(this)} 
                        onBlur={this.handleSubmit.bind(this)}      
                    />
                    <Priority 
                        class={priorityClass} 
                        onClick={this.props.onChange} 
                        id="priority" 
                    />
                </div>
                <TextareaAutosize
                    maxLength={240} 
                    placeholder="Insert your notes here" 
                    className="text-area-autosize todo-item-notes"
                    id="notes"
                    value={this.state.notes} 
                    onChange={this.handleNotesChange.bind(this)}
                    onBlur={this.handleSubmit.bind(this)}
                    />
                <div className="sub-tasks-container">
                    <div className="sub-tasks-title sub-title">SUB TASKS</div>
                    {this.props.todo.subTasks.length > 0 
                    ? this.props.todo.subTasks.map(subTask => (
                        <TodoItem 
                            key={this.props.todo.subTasks.indexOf(subTask)} 
                            todo={subTask} 
                            onStatusChange={this.props.onStatusChange}
                            onDelete={this.props.onSubTaskDelete}
                            onUpdate={this.props.onSubTaskUpdate}
                        />
                    ))
                    : null}
                    <SubTask onSubmit={this.props.onSubTaskSubmit} />
                </div>
                <div className="date-container">
                    <div className="date-title sub-title">CREATED</div>
                    <div className="date">{moment(this.props.todo.date).format('ll')}</div>
                </div>
            </div>
        )
    };
}

export default TodoDetail;