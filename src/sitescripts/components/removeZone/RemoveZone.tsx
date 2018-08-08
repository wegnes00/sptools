import * as React from 'react';
import { DroppableStateSnapshot, Droppable } from 'react-beautiful-dnd';
require("./RemoveZone.scss");
const getClassNames = (snapshot:DroppableStateSnapshot) => {
    return [
        "remove-zone",
        snapshot.isDraggingOver ? "dragging" : ""
    ].filter(c => c).join(" ");
}
export default class RemoveZone extends React.PureComponent<RemoveZoneProps, {}> {
    render() {
        return (
            <Droppable droppableId="remove-zone">
                {(provided, snapshot) => (
                    <div className={getClassNames(snapshot)} ref={provided.innerRef}>
                        <h2 className='sideways'>Remove Action</h2>
                    </div>

                )}
            </Droppable>
        );
    }
}

export interface RemoveZoneProps {
    //props
}