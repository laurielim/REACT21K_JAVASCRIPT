let a = [],
  counter = 0;

while (true) {
  a[counter] = counter + 1;
  counter++;
  if (counter > 99) {
    break;
  }
}
