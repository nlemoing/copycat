const changes = {};

export function trackChanges(id, value) {
  changes[id] = value;
}

export function logChanges() {
  console.log(changes);
}
