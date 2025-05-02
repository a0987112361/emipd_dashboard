import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card from './Card';
import CardWall from './CardWall';
import CardLayer from './CardLayer';
import { translate as t } from 'src/Helpers/I18n';

import './TrelloCard.css'

class TrelloCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
    }
    this.updateCardStatus = this.updateCardStatus.bind(this)
  }

  updateCardStatus(cardId, targetStatus, project_id) {
    const { updateCardStageStatus } = this.props;
    updateCardStageStatus(cardId, targetStatus, project_id);
  }

  groupOfCards() {
    const { tasks } = this.props;
    const cardsGroup = {};

    tasks.forEach((task) => {
      if (Array.isArray(cardsGroup[task.task_status.task_status_name])) {
        cardsGroup[task.task_status.task_status_name].push(task)
      } else {
        cardsGroup[task.task_status.task_status_name] = [task]
      }
    })
    return cardsGroup
  }

  render() {
    const cards = this.groupOfCards();
    const {
      taskStatus,
      isTask = false,
      stage_id,
      handleDelete,
      handleCreateTask,
      handleClickUpdate,
    } = this.props;

    return (
      <div className="App">
        <div className="board">
          <CardLayer />
          {
            taskStatus.map(item => (
              <CardWall
                key={item.task_status_id}
                status_id={item.task_status_id}
                status={item.task_status_name}
                updateCardStatus={this.updateCardStatus}
              >
                <div onClick={() => handleCreateTask(item.task_status_id)} className="add-card">
                  {t('common_create_new_task')}
                </div>
                <div style={{ maxHeight: 'calc(100vh - 258px)', minHeight: '8px', overflowY: 'auto' }}>
                  {
                    (cards[item.task_status_name] || []).map(card => (
                      <Card
                        key={card.task_id}
                        id={card.task_id}
                        stage_id={stage_id}
                        project_id={card.project_id}
                        status_id={item.task_status_id}
                        status={item.task_status_name}
                        data={card}
                        isTask={isTask}
                        project_name={card.project_name}
                        handleDelete={handleDelete}
                        handleClickUpdate={handleClickUpdate}
                      />
                    ))
                  }
                </div>
              </CardWall>
            ))
          }
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(TrelloCard)
