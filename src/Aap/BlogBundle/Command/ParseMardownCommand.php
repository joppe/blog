<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Command;

use Aap\BlogBundle\Service\Markdown\Markdown;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class ParseMardownCommand
 *
 * @package Aap\BlogBundle\Command
 */
class ParseMardownCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('aap:parse_mardown')
            ->setDescription('Hello PhpStorm')
            ->addArgument(
                'source',
                InputArgument::REQUIRED,
                'Provide file to parse'
            )
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        /** @var Markdown $markdown */
        $markdown = $this->getContainer()->get('aap_blog.markdown');

        $output->writeln('Parse markdown');
        $markdown->parse($input->getArgument('source'));
    }
}
