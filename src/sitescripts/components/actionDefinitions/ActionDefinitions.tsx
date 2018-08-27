import * as React from 'react';
import { ActionDefinition } from '../../data/interfaces';
import { Droppable, DroppableStateSnapshot, Draggable } from 'react-beautiful-dnd';
import ActionDefinitionItem from './ActionDefinitionItem';

const getClassNames = (snapshot:DroppableStateSnapshot) => {
    return [
        "action-definitions",
        "column",
        snapshot.isDraggingOver ? "dragging" : ""
    ].filter(c => c).join(" ");
}
export default class ActionDefinitions extends React.PureComponent<ActionDefinitionsProps, {}> {
    render() {
        return (
            <Droppable droppableId="action-definitions" isDropDisabled={true}>
                {(provided, snapshot) => {
                    return (
                        <div className={getClassNames(snapshot)} ref={provided.innerRef}>
                            {this.props.actionDefinitions.map((action, index) => (
                                <ActionDefinitionItem key={action.verb} action={action} index={index} />
                            ))}
                        </div>
                    )
                }}
            </Droppable>
        );
    }
}

export interface ActionDefinitionsProps {
    //props
    actionDefinitions:ActionDefinition[]
}