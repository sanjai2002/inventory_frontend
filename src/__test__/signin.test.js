import { fireEvent, render, screen } from '@testing-library/react';
import Signin  from '../Components/Signin'

test('Test case-1[render all ui]',()=>{
    render(<Register/>);
    const Emailinput=screen.getByTestId('Emailinput');
    const Passwordinput=screen.getByTestId('Passwordinput');
    const submit =screen.getByTestId('submit');

    expect(Emailinput).toBeInTheDocument();
    expect(Passwordinput).toBeInTheDocument();
    expect(submit).toBeInTheDocument(); 
  })