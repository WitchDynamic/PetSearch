import {render , screen, fireEvent, cleanup} from "@testing-library/react";
import LocationModal from "@/components/layout/LocationModal";

const onSubmit = (newZipCode: string) => console.log(newZipCode);
const onClose = () => console.log("close");

function getButtonWithTextContent(buttons: HTMLElement[], textContent: RegExp ): HTMLElement | undefined{
    return buttons.find(button => button.textContent?.match(textContent));
}
const propsOnCloseMock = jest.fn(onClose);
const propsOnSubmitMock = jest.fn(onSubmit);
describe("LocationModal", () => {
    beforeEach(() => {
        render(<LocationModal onClose={propsOnCloseMock} onSubmit={propsOnSubmitMock}/>);
    });
    afterEach(() => {
        propsOnCloseMock.mockClear();
        propsOnSubmitMock.mockClear();
        cleanup();
    });

    it('should display New Zip code as header.', () => {
        // Arrange
        const headerElement = screen.getByRole("heading");
        // /.../i disable case sensitive.
        // Act and Assert
        expect(headerElement.textContent).toMatch(/New Zip Code/i);
    });
    it('should display Enter Zip Code label.', () => {
        expect(screen.getByLabelText(/enter zip code/i));
    });
    it('should have a cancel button.', () => {
        const buttons = screen.getAllByRole("button");
        const cancelReg = /cancel/i;
        // Undefined if not found.
        const cancelButton = getButtonWithTextContent(buttons, cancelReg);
        expect(cancelButton).not.toBeUndefined();
    });
    it('should have a submit button.', () => {
        const buttons = screen.getAllByRole("button");
        // Create regex for each string in buttons to match the text content cancel.
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        expect(submitButton).not.toBeUndefined();
    });
    it('should call the onClose prop function after the cancel button is clicked.', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const cancelReg = /cancel/i;
        const cancelButton = getButtonWithTextContent(buttons, cancelReg);
        if(!cancelButton) throw new Error("Cancel button not found!");
        // Act
        fireEvent.click(cancelButton);
        expect(propsOnCloseMock).toBeCalled();
    });
    it('should not call the onSubmit prop function if input is empty.', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        if(!submitButton) throw new Error("Cancel button not found!");
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: ''}});
        fireEvent.click(submitButton);
        expect(propsOnSubmitMock).not.toBeCalled();
    });
    it('should not call the onSubmit prop function if input does not have numbers exclusively.', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        if (!submitButton) throw new Error("Cancel button not found!");
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: 'abcde'}});
        fireEvent.click(submitButton);
        expect(propsOnSubmitMock).not.toBeCalled();
    });
    it('should not call the onSubmit prop function if input does only has less than 5 numbers..', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        if (!submitButton) throw new Error("Cancel button not found!");
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: '123'}});
        fireEvent.click(submitButton);
        expect(propsOnSubmitMock).not.toBeCalled();
    });
    it('should call the onSubmit prop function if input is made of 5 numbers', function () {
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        if(!submitButton) throw new Error("Cancel button not found!");
        const input = screen.getByRole<HTMLTextAreaElement>("textbox");
        fireEvent.change(input, {target: {value: '92101'}});
        fireEvent.click(submitButton);
        expect(propsOnSubmitMock).toBeCalled();
    });
});
