import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class CalculatorTest {

	@Test
	public void testAddition() {
		Calculator c = new Calculator();
		assertEquals(30, c.add(10, 20));
	}
}