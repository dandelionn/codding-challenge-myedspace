import { render, screen } from "@testing-library/react";
import {SwrExampleContainer} from "./swr";
import { MantineProvider } from '@mantine/core';

describe("SwrExampleContainer", () => {
    test("renders component with data from msw handler", async () => {
        render(
            <MantineProvider>
                <SwrExampleContainer userId={1000} />
            </MantineProvider>
        );
        expect(await screen.findByText(/c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d/)).toBeInTheDocument();
    });

    test('renders correctly and matches snapshot', () => {
        const { container } = render(
            <MantineProvider>
                <SwrExampleContainer userId={1000} />
            </MantineProvider>
        );
        expect(container).toMatchSnapshot();
    });
});
