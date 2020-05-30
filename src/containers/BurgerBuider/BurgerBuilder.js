import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredients();
        
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return  sum > 0
       
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    render() {
        let disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                        <BuildControls
                            addIngredientHandler = {this.props.onIngredientAdded}
                            removeIngredientHandler = {this.props.onIngredientRemoved} 
                            disabled = {disabledInfo}
                            purchaseable = {this.updatePurchaseState(this.props.ings)}
                            price = {this.props.price}
                            purchaseHandler = {this.purchaseHandler}/>
                </Aux>        
            );
            
            orderSummary = <OrderSummary ingredients = {this.props.ings}
                price = {this.props.price}  
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler} />; 
        }

        // if(this.state.loading) {
        //     orderSummary = <Spinner />;
        // }    
        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)), 
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));