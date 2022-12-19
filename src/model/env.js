export const ERROR_MSG = 'Invalid input';
export const OP_FAILED = 'Operation failed';
export const HELP = [
  { command: 'up',
    arguments: 'none',
    description: 'Go upper from current directory.'
  },
  {
    command: 'cd',
    arguments: 'path_to_directory',
    description: 'Go to dedicated folder from current directory.'
  },
  {
    command: 'ls',
    arguments: 'none',
    description: 'Print in console list of all files and folders in current directory.'
  },
  {
    command: 'cat',
    arguments: 'path_to_file',
    description: 'Read file and print it`s content in console.'
  },
  {
    command: 'add',
    arguments: 'new_file_name',
    description: 'Create empty file in current working directory.'
  },
  {
    command: 'rn',
    arguments: 'path_to_file new_filename',
    description: 'Rename file',
  },
  {
    command: 'cp',
    arguments: 'path_to_file path_to_new_directory',
    description: 'Copy file.'
  },
  {
    command: 'mv',
    arguments: 'path_to_file path_to_new_directory',
    description: 'Move file.'
  },
  {
    command: 'rm',
    arguments: 'path_to_file',
    description: 'Delete file.'
  },
  {
    command: 'os',
    arguments: '--EOL',
    description: 'Get EOL (default system End-Of-Line) and print it to console.'
  },
  {
    command: 'os',
    arguments: '--cpus',
    description: 'Get host machine CPUs info and print it to console.'
  },
  {
    command: 'os',
    arguments: '--homedir',
    description: 'Get home directory and print it to console.'
  },
  {
    command: 'os',
    arguments: '--username',
    description: 'Get current system user name and print it to console.'
  },
  {
    command: 'os',
    arguments: '--architecture',
    description: 'Get CPU architecture and print it to console.'
  },
  {
    command: 'hash',
    arguments: 'path_to_file',
    description: 'Calculate hash for file and print it into console.'
  },
  {
    command: 'compress',
    arguments: 'path_to_file path_to_destination(optional)',
    description: 'Compress file.'
  },
  {
    command: 'decompress',
    arguments: 'path_to_file path_to_destination(optional)',
    description: 'Decompress file'
  }
];