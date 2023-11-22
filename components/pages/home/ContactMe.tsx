import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

const ContactMe = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Contact Me!</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2 font-bold">Contact Me!</DialogTitle>
            <DialogDescription>
              <p>
                If you have any questions, please contact me via email or join
                to my discord server!
              </p>
              <p className="mt-4">
                <a
                  href="mailto:yukiohori@gmail.com"
                  className="text-indigo-500"
                >
                  yukiohori@gmail.com
                </a>
              </p>
              <p className="mt-2">
                <a
                  href="https://discord.gg/PgkcKxGR"
                  target="_blank"
                  className="text-indigo-500"
                >
                  Discord
                </a>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ContactMe };
