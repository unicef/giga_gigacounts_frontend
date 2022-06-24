import { ChangeEvent, MouseEvent, useReducer, useState } from 'react';
import Connection from './Connection/Connection';
import General from './General/General';
import Schools from './Schools/Schools';
import { ActionType, ActiveTab, ITabItems, reducer, state, TabState } from './store/redux';
import {
  CreateContractContainer,
  Header,
  FormHeaderActions,
  FormHeaderTabs,
  GeneralContainer,
  FormHeaderMessage
} from './styles';

interface ICreateContractsProps {
  label?: string;
}

const CreateContract: React.FC<ICreateContractsProps> = ({ ...props }): JSX.Element => {
  const [localState, dispatch] = useReducer(reducer, state);

  const {
    contractNumber,
    activeTab,
    invalidData,
    missingData,
    tabGeneralStatus,
    tabConnectionStatus,
    tabSchoolStatus
  } = localState;

  const tabsItems: ITabItems[] = [
    {
      id: '1',
      name: 'General'
    },
    {
      id: '2',
      name: 'Connection'
    },
    {
      id: '3',
      name: 'Schools'
    }
  ];

  const handleActiveTab = (e: MouseEvent<HTMLButtonElement>) =>
    dispatch({
      type: ActionType.SET_ACTIVE_TAB,
      payload: {
        activeTab: e.currentTarget.name,
        tabGeneralStatus: TabState.DefaultError,
        tabConnectionStatus: TabState.Selected,
        tabSchoolStatus: TabState.Default
      }
    });

  const tabContent = () => {
    switch (activeTab) {
      case ActiveTab.General:
        return <General state={state} dispatch={dispatch} />;
      case ActiveTab.Connection:
        return <Connection state={state} dispatch={dispatch} />;
      case ActiveTab.Schools:
        return <Schools state={state} dispatch={dispatch} />;
      default:
        break;
    }
  };

  const tabIconState = (status: string) => {
    switch (status) {
      case TabState.Default:
        return <span className={`icon icon-16 circle`} />;
      case TabState.DefaultCompleted:
        return <span className={`icon icon-16 icon-checkmark icon-light-blue circle`} />;
      case TabState.DefaultError:
        return <span className={`icon icon-16 icon-pointer circle`} />;
      case TabState.Selected:
        return <span className={`icon icon-16 circle selected`} />;
      case TabState.SelectedCompleted:
        return <span className={`icon icon-16 circle selected`} />;
      case TabState.SelectedError:
        return <span className={`icon icon-16 circle selected`} />;
      default:
        break;
    }
  };

  console.log('state', localState);

  return (
    <CreateContractContainer>
      <Header>
        <FormHeaderActions>
          <div>
            <h5>New Contract {contractNumber}</h5>
          </div>
          <div>
            <button className="btn-transparent-grey active">Discard</button>
            {contractNumber && <button className="btn-blue">Save Draft</button>}
          </div>
          {true && <button className="btn-green">Publish</button>}
        </FormHeaderActions>
        <FormHeaderTabs>
          {tabsItems.map((tab, i) => {
            return (
              <button
                key={i}
                id={tab.id}
                name={tab.name}
                onClick={handleActiveTab}
                className={`${activeTab === tab.name ? 'active' : ''}`}
              >
                <span className={`icon icon-16 circle ${activeTab === tab.name ? 'selected' : ''}`} />
                {/* {tab.name === ActiveTab.General && tabIconState(tabGeneralStatus)}
                {tab.name === ActiveTab.Connection && tabIconState(tabConnectionStatus)}
                {tab.name === ActiveTab.Schools && tabIconState(tabSchoolStatus)} */}
                <p>{tab.name}</p>
              </button>
            );
          })}
          <FormHeaderMessage>
            {activeTab === ActiveTab.General && (
              <>
                <span className="icon icon-24 icon-expired icon-blue" />
                <p>Please enter the contract name to be able to save the draft</p>
              </>
            )}
            {(missingData || invalidData) && (
              <>
                <span className="icon icon-24 icon-error icon-red" />
                <p className="error">
                  {missingData
                    ? `Some of the tabs are missing information`
                    : `There's invalid data in the indicated tabs. Please correct it before publishing`}
                </p>
              </>
            )}
          </FormHeaderMessage>
        </FormHeaderTabs>
      </Header>
      <GeneralContainer>{tabContent()}</GeneralContainer>
    </CreateContractContainer>
  );
};
export default CreateContract;
