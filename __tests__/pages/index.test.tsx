import { render, screen } from '@testing-library/react';
import Home from "@/pages";
import { LocationProvider } from "@/hooks/LocationContext";
import '@testing-library/jest-dom';

describe("Home", () => {
    beforeEach(() => {
        render(<LocationProvider>
            <Home />
        </LocationProvider>);
    })
    it("renders a heading", () => {
        const heading = screen.getByRole("heading", {
            name: /Find your perfect furry companion!/i
        })
        expect(heading).toBeInTheDocument();
    })
})
