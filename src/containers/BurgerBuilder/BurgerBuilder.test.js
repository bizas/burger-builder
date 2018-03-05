import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />',() => {
   let wrapper;

   beforeEach(() => {
      wrapper = shallow(<BurgerBuilder onInitIngredients={()=> {}} onInitIngredientPrices={()=> {}} />);
   });

   it('should render <BuildControls /> when receiving ingredients',() => {
      wrapper.setProps({ingredients: {salad: 1}});
      expect(wrapper.find(BuildControls)).toHaveLength(1);
   });

   it('should render <Burger /> when receiving ingredients',() => {
      wrapper.setProps({ingredients: {salad: 1}});
      expect(wrapper.find(Burger)).toHaveLength(1);
   });
});