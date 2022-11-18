export class MessageType {
    public static readonly SUCCESS = new MessageType('success', 'Success');
    public static readonly INFO = new MessageType('info', 'Info');
    public static readonly WARNING = new MessageType('warn', 'Warning');
    public static readonly ERROR = new MessageType('error', 'Error');

    private constructor(
        public readonly typeName: string,
        public readonly displayName: string
    ) {}
}
