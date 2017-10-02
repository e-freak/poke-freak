/**
 * test-setup.js
 */



class MockWindow {
}

class MockImage {
}

global.window = MockWindow;
global.window.Image = MockImage;
