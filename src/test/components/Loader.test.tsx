import { describe, expect, it } from "vitest";
import { render, screen } from "../../utils/test-utils"
import Loader from "../../components/Loader";

describe("Loader", () => {
    it("testing the loader", () => {
        render(<Loader />);

        const title = screen.getByText("Loading...")
        expect(title).toBeInTheDocument()
    })
})