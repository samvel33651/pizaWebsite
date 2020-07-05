import React  from 'react';
import './index.css';

const  RegisterPage = () => {
    return (
        <div className="signup-form">
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <hr/>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
					<span className="input-group-text">
						<span className="fa fa-user"></span>
					</span>
                            </div>
                            <input type="text" className="form-control" name="username" placeholder="Username"
                                   required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-paper-plane"></i>
					</span>
                            </div>
                            <input type="email" className="form-control" name="email" placeholder="Email Address"
                                   required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
					</span>
                            </div>
                            <input type="text" className="form-control" name="password" placeholder="Password"
                                   required="required"/>
                        </div>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <div className="input-group">*/}
                    {/*        <div className="input-group-prepend">*/}
					{/*<span className="input-group-text">*/}
					{/*	<i className="fa fa-lock"/>*/}
					{/*	<i className="fa fa-check"/>*/}
					{/*</span>*/}
                    {/*        </div>*/}
                    {/*       */}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                    </div>

            <div className="text-center">Already have an account? <a href="#">Login here</a></div>
        </div>
    )
}

export default RegisterPage;
