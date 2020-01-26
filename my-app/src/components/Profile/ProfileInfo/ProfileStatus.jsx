import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false
    };

    activateEditMode = () => {
        console.log(this);
        this.setState({
            editMode: true
        });
    };

    deActivateEditMode = () => {
        console.log(this);
        this.setState({
            editMode: false
        });
    };

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                    : <div>
                        <input autoFocus={true} onBlur={this.deActivateEditMode} defaultValue={this.props.status}/>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;