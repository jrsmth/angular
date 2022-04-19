import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  let component: VoteComponent;

  beforeEach(() => {
    // Arrange - initialise the system under test
    component = new VoteComponent();
  })

  it('should increment totalVotes when up-voted', () => {
    // Act - call the actual method/function
    component.upVote();

    // Assert - check the result equals what is expected
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when down-voted', () => {
    // Act - call the actual method/function
    component.downVote();

    // Assert - check the result equals what is expected
    expect(component.totalVotes).toBe(-1);
  });
});