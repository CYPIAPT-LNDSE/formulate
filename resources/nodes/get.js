this.label = this.name;

switch (this.type) {
    case 'symptom':
        this.color = '#00ff00';
        this.size = 1;
        break;
    case 'causal':
        this.color = '#0000ff';
        this.size = 1;
        break;
    case 'treatment':
        this.color = '#ff00ff';
        this.size = 1;
        break;
    default:
        this.color = '#000000';
        this.size = 1;
        break;
}