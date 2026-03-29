'use client';
import { ArrowRight } from 'lucide-react';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/common/libs/ui/button';
import useModalhook from '@/modules/ui/store/modal/useModalhook';
import { ModalId } from '@/modules/ui/store/modal/modal.type';
import ContactForm from '../hero/HeroContact/ContactForm';
import { REGISTER_PATH } from '@/common/libs/auth/auth.constants';

const CTASection = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModalhook();

  const handleGoToRegister = useCallback(() => {
    router.push(REGISTER_PATH);
  }, [router]);

  const handleSubmitLead = useCallback(async () => {
    const onAfterSubmit = () => {
      closeModal(ModalId.SUBMIT_LEAD);
    };

    openModal({
      id: ModalId.SUBMIT_LEAD,
      title: 'Talk to our team',
      titleDescription:
        'Share your contact information and we’ll reach out to show you how QuickForm can simplify form creation, automate collection, and improve your workflow.',
      content: <ContactForm onAfterSubmit={onAfterSubmit} />,
    });
  }, [openModal, closeModal]);

  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-border bg-primary px-8 py-12 text-primary-foreground shadow-2xl shadow-black/10 sm:px-12 lg:py-16 dark:shadow-black/30">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Ready to launch
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Turn your form process into a cleaner product experience.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              QuickForm helps you deliver forms that look better, feel easier,
              and generate more useful data for your business.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Button
              variant="secondary"
              className="h-12 rounded-xl px-6"
              onClick={handleGoToRegister}
            >
              Start free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-xl border-primary-foreground/20 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={handleSubmitLead}
            >
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
