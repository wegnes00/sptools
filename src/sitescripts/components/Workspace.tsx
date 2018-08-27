import * as React from 'react';
import { DragDropContext, DropResult, DragUpdate, HookProvided, DragStart } from 'react-beautiful-dnd';
import { ActionDefinition, SiteScriptAction } from '../data/interfaces';
import ActionDefinitions from './actionDefinitions/ActionDefinitions';
import SiteScriptActions from './actions/SiteScriptActions';
import hub from '../hub/hub';
import RemoveZone from './removeZone/RemoveZone';
import AdvancedEditor from './code/AdvancedEditor';
require("./Workspace.scss");

export default class Workspace extends React.PureComponent<WorkspaceProps, {}> {
    onDragStart = (dragStart:DragStart) => {
        console.log("START", dragStart);
    }
    onDragUpdate = (dragUpdate: DragUpdate) => {
        console.log("Update", dragUpdate)
    }
    onDragEnd = (result:DropResult) => {
        if (!result.destination) return;

        // Add new action
        if (result.source.droppableId === "action-definitions" && result.destination.droppableId === "actions" ) {
            hub.trigger("actions:add", result.draggableId, result.destination.index);
        }
        // Reorder
        else if (result.source.droppableId === "actions" && result.destination.droppableId === "actions") {
            hub.trigger("actions:reorder", result.draggableId, result.destination.index);
        }
        // Remove
        else if (result.source.droppableId === "actions" && result.destination.droppableId === "remove-zone") {
            hub.trigger("actions:remove", result.draggableId);
        }
    }
    render() {
        return (
            <DragDropContext 
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}>
                <div className='workspace'>
                    <ActionDefinitions actionDefinitions={this.props.actionDefinitions} />
                    <SiteScriptActions actions={this.props.actions} />
                    {/* <RemoveZone /> */}
                    <AdvancedEditor json={this.props.json} />
                </div>
            </DragDropContext>
        );
    } 
}

export interface WorkspaceProps {
    actionDefinitions: ActionDefinition[],
    actions:SiteScriptAction[],
    json: string,
}