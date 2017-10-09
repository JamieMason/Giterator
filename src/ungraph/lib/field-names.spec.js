import fieldNames from './field-names';

describe('fieldNames', () => {
  it('defines what data is needed from the git log', () => {
    expect(fieldNames).toBeNonEmptyArray();
    expect(fieldNames).toBeArrayOfStrings();
  });
});
