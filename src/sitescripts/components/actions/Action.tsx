import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import { Draggable } from 'react-beautiful-dnd';

export default class Action extends React.PureComponent<ActionProps, {}> {
    render() {
        let { action, index } = this.props;
        return (
            <Draggable key={action.id} draggableId={action.id} index={index}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        className={"action " + (snapshot.isDragging ? "dragging" : "")} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                        {action.id}
                    </div>
                )}
            </Draggable>
        );
    }
}

export interface ActionProps {
    action: SiteScriptAction,
    index:number,
}