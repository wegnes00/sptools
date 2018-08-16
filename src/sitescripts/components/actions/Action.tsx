import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import { Draggable } from 'react-beautiful-dnd';
import ActionProperties from './ActionProperties';

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
                        <h3>{action.id}</h3>
                        <ActionProperties action={action} />
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